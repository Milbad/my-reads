import React from 'react'
import BooksShelfList from './BooksShelfList'
import {Link} from 'react-router-dom'


function BooksList (props) {

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Currently Reading</h2>
            <BooksShelfList books={props.books.filter(b => b.shelf === 'currentlyReading')} onChangeShelf={props.onChangeShelf}/>
          </div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Want to Read</h2>
            <BooksShelfList books={props.books.filter(b => b.shelf === 'wantToRead')} onChangeShelf={props.onChangeShelf}/>
          </div>
          <div className='bookshelf'>
            <h2 className="bookshelf-title">Read</h2>
            <BooksShelfList books={props.books.filter(b => b.shelf === 'read')} onChangeShelf={props.onChangeShelf}/>
          </div>
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}


export default BooksList;
