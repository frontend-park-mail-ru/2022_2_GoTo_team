package api

import (
	"2022_2_GoTo_team/server/api/models"
	"2022_2_GoTo_team/server/storage"
	"encoding/json"
	"log"
	"net/http"
)

type Api struct {
	usersStorage *storage.UsersStorage
	sessions     []models.Session
}

func GetApi() *Api {
	authApi := &Api{
		usersStorage: storage.GetUsersStorage(),
	}
	authApi.usersStorage.PrintUsers()

	return authApi
}

func (api *Api) SignupUserHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	parsedInput := new(models.User)
	err := json.NewDecoder(r.Body).Decode(parsedInput)
	if err != nil {
		http.Error(w, `{"error":"cant parse JSON"}`, 400)
		return
	}

	log.Println(parsedInput)
	err = api.usersStorage.AddUser(
		parsedInput.NewUserData.Username,
		parsedInput.NewUserData.Email,
		parsedInput.NewUserData.Login,
		parsedInput.NewUserData.Password,
	)

	if err != nil {
		http.Error(w, `{"error":"storage error"}`, 500)
		return
	}

	api.usersStorage.PrintUsers()
	w.WriteHeader(200)
}

func (api *Api) CreateSessionHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	parsedInput := new(models.Session)
	err := json.NewDecoder(r.Body).Decode(parsedInput)
	if err != nil {
		http.Error(w, `{"error":"cant parse JSON"}`, 400)
		return
	}

	log.Println(parsedInput)

	api.sessions = append(api.sessions, *parsedInput)

	api.printSessions()

	w.WriteHeader(200)
}

func (api *Api) printSessions() {
	log.Printf("Sessions in storage:")
	for _, v := range api.sessions {
		log.Printf("%#v ", v)
	}
}
