# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# Chatt_Space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :tweets
- has_many  :chattgroups,  through:  :user_chattgroup

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false　if:image = null|
|image|string|null: false if:text = null|
|user_id|integer|null: false, foreign_key: true|
|chattgroup_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chattgroup

## chattgroupテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
### Association
- has_many :tweets
- has_many  :users,  through:  :user_chattgroup

## user_chattgroupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chattgroup_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chattgroup