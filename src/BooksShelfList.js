import React, {Component} from 'react'
import Rating from 'react-rating'
import sortBy from 'sort-by'

class BooksShelfList extends Component {

  handleChange = (book, e) => {
    e.preventDefault()
    if (this.props.onChangeShelf)
      this.props.onChangeShelf(book, e.target.value)
  }

  handleClick = (rate, book) => {
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem(book.id, rate)
    }
    else{
      console.log('sorry, no rating available! Your browser does not support Web Storage...')
    }
  }

  render() {

    const {books} = this.props
    let rating
    let previousID=''
    let listOfBooksNew = []
    const booksCopy = [...books]
    if (booksCopy) {
        booksCopy.sort(sortBy('title'))
        booksCopy.forEach(book => {
        rating = localStorage.getItem(book.id)
        if (rating)
          rating = parseInt(rating, 10)
          book.bookrating = rating
        if(book.id !== previousID) {
          listOfBooksNew.push(book)
        }
        previousID = book.id
      })
    }

    return (

      <div className='bookshelf-books'>
        {listOfBooksNew  && (
          <ol className='books-grid'>
            {listOfBooksNew.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div className='book-cover' style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}></div>
                    <div className='book-shelf-changer'>
                      <select value={book.shelf} onChange={(event) => this.handleChange(book, event)}>
                        <option disabled>Move to...</option>
                        <option value='currentlyReading'>Currently Reading</option>
                        <option value='wantToRead'>Want to Read</option>
                        <option value='read'>Read</option>
                        <option value='none'>None</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>{book.title}</div>
                  {book.authors && (
                    <div className='book-authors'>{book.authors.join(' - ')}</div>
                  )}
                  {book.shelf === 'read' && (
                    <div className='book-rating'>
                      <div>Rate this book</div>
                      <Rating
                        initialRate={book.bookrating}
                        empty={< span className='icon-text' > ♡ < /span>}
                        full={< span className='icon-text' > ♥ < /span>}
                        onClick={(rate) => this.handleClick(rate, book)}/>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    )
}
}

export default BooksShelfList;
