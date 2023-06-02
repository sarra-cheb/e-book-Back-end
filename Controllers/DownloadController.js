
const Book = require('../Models/BookModel')
const Download = require('../Models/DownloadModel')

exports.getListOfClient = async (req, res) => {
  try {
    const downloads = await Download.find().populate('client').populate('book');
    const clientBooks = {};
    downloads.forEach(download => {
      const clientId = download.client._id.toString();
      if (!clientBooks.hasOwnProperty(clientId)) {
        clientBooks[clientId] = {
          client: download.client,
          books: [download.book],
        };
      } else {

        clientBooks[clientId].books.push(download.book);
      }
    });
    const clientBooksList = Object.values(clientBooks);
    res.send({ message: 'List of clients and their downloaded books', clientBooksList });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

exports.downloadBook = async (req, res) => {
  try {
    const found = await Book.findById(req.params.id);
    if (!found) {
      return res.status(404).send({ message: 'Book not found' });
    }
    else {

      if (req.user.role === 'client') {
        if (req.user.typeofclient === 'abonné') {
          const currentMonth = new Date().getMonth() + 1
          const downloadsThisMonth = await Download.countDocuments({
            client: req.user._id,
            month: currentMonth
          })
          console.log(downloadsThisMonth)
          if (downloadsThisMonth > 5) {
            res.send({ message: 'vous avez depasse le nombre de telechargement possible' })
          } else {
            res.download(found.download);
            const newDo = await Download.create({
              client: req.user._id,
              month: currentMonth,
              book: found._id
            })
            console.log(newDo)
            console.log('success')
          }
        }
        else {
          res.send({ message: 'Unauthorized' })
        }
      }
      else {
        res.download(found.download);
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};


