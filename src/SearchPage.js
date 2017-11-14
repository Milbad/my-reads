import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BooksShelfList from './BooksShelfList'
import DebounceInput from 'react-debounce-input'

class SearchPage extends Component {

  handleChange = (query) => {
    if (this.props.onUpdateQuery)
      this.props.onUpdateQuery(query)
  }

  render() {
    const {booksReasearch, onChangeShelf} = this.props

    return (
      <div>
        <div className='search-books'>
          <div className='search-books-bar'>
            <Link className='close-search' to='/'>Close</Link>
            <div className='search-books-input-wrapper'>
              <DebounceInput
                  type='text'
                  placeholder='Search by title or author'
                  debounceTimeout={300}
                  onChange={(event) => this.handleChange(event.target.value)}/>
            </div>
          </div>
        </div>
        {booksReasearch  && (
        <div className='search-books-results'>
          <BooksShelfList books={booksReasearch} onChangeShelf={onChangeShelf}/>
        </div>
      )}
      </div>

    )

  }
}
export default SearchPage;
