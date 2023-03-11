-- create dbs
CREATE DATABASE todos;

-- create table
CREATE TABLE `todolist` (
     `id` int(20) NOT NULL AUTO_INCREMENT,
     `title` varchar(255) NOT NULL,
     `status` int(20) NOT NULL, 
     PRIMARY KEY (`id`)
) ;

Insert into `todolist` (`title`, `status`) VALUES ("BPO hw", 0);

Insert into `todolist` (`title`, `status`) VALUES ("cyber hs", 0);