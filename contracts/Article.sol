// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "./Ownable.sol";

contract Article is Ownable {
  uint public count;

  struct Article {
    uint id;
    string date;
    string title;
    string content;
  }
 
  event AddArticle(uint x);
  event RemoveArticle(uint x);
  mapping(uint256 => Article) public articles;

  function write(string memory date, string memory title,  string memory content) public {
    //Emit an event
    articles[count] = Article(count, date, title, content);
    emit AddArticle(count);
    count++;
  }
  function remove(uint index) public onlyOwner {
      articles[index] = articles[count-1];
      delete articles[count-1];
      emit RemoveArticle(index);
      count--;
    }
}
