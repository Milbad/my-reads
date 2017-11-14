import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import SearchPage from './SearchPage'
import {Route} from 'react-router-dom'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    booksReasearch: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateQuery = (query) => {
    this.setState({query})
    query = query.trim()
    if (query.length > 1) {
      BooksAPI.search(query).then((books) => {
        if (books) {
          let bookCopy = books
          if (books.length > 0) {
            //Modiying the shelves because the API search method cannot be trusted
              bookCopy.forEach(bookItem => {
                if (this.state.books.indexOf(bookItem) === -1){
                  bookItem.shelf = "none"
                }
                this.state.books.forEach(bookHome => {
                  if (bookItem.id === bookHome.id) {
                    bookItem.shelf = bookHome.shelf
                    bookItem.bookrating = bookHome.bookrating
                  }
                })
              })
            }
            this.setState(state => ({booksReasearch: bookCopy}))
          }
        })
      }
  }

  addBook(book, shelf) {
    book.shelf = shelf
    book.bookrating = 0
    this.setState(state => ({
      books: this.state.books.concat([book])
    }))
  }

  updateBookShelf(book, shelf) {
    let bookCopy = this.state.books
    let booksReasearchCopy = this.state.booksReasearch
    bookCopy.forEach(bookItem => {
      if (bookItem.id === book.id) {
        bookItem.shelf = shelf
        bookItem.bookrating = 0
      }
    })
    booksReasearchCopy.forEach(bookItem => {
      if (bookItem.id === book.id) {
        bookItem.shelf = shelf
        bookItem.bookrating = 0
      }
    })
    this.setState(state => ({
      books: bookCopy,
      booksReasearch: booksReasearchCopy
    }))

  }

  changeShelf(book, shelf) {
    let id = book.id
    let newBook = true

    this.state.books.forEach(bookItem => {
      if (bookItem.id === id) {
        newBook = false
      }
    })
    //When it is a new book
    if (newBook) {
      this.addBook(book, shelf)//We already have this book in our list
    } else {
      this.updateBookShelf(book, shelf)
    }
    //We use BooksAPI to update the backend
    BooksAPI.update(book, shelf)
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/"  render={() => (
          <BooksList books={this.state.books} onChangeShelf={(id, shelf) => {
          this.changeShelf(id, shelf)
          }}
        />
      )}/>
        <Route path="/search" render={({history}) => (
          <SearchPage
            booksHome={this.state.books}
            booksReasearch={this.state.booksReasearch}
            query={this.state.query}
            onChangeShelf={(id, shelf) => {
                this.changeShelf(id, shelf)
              }}
            onUpdateQuery={(query) => {
                  this.updateQuery(query)
                }}
            />
      )}/>
      </div>
    )
  }
}

export default BooksApp;
