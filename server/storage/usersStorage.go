package storage

import (
	"2022_2_GoTo_team/server/storage/models"
	"log"
	"sync"
)

var users = []*models.User{
	{
		"asd",
		"asd@asd.asd",
		"asdLogin",
		"asdPass",
	},
	{
		"qwe",
		"qwe@qwe.qwe",
		"qweLogin",
		"qwePass",
	},
}

type UsersStorage struct {
	users []*models.User
	mu    sync.RWMutex
	//nextID uint
}

func (o *UsersStorage) PrintUsers() {
	log.Printf("Users in storage:")
	for _, v := range o.users {
		log.Printf("%#v ", v)
	}
}

func (o *UsersStorage) AddUser(username string, email string, login string, password string) error {
	log.Println("Storage AddUser called.")

	user := &models.User{
		Username: username,
		Email:    email,
		Login:    login,
		Password: password,
	}

	o.mu.Lock()
	o.users = append(o.users, user)
	o.mu.Unlock()

	return nil
}

func GetUsersStorage() *UsersStorage {
	return &UsersStorage{
		users: users,
		mu:    sync.RWMutex{},
	}
}
