import {Requests} from "./requests";
import {APIStrings} from "../common/consts";

export type NotificationParams = {
    title: string,
    body: string,
    url: string,
    icon: string,
}

export class NotificationModule {
    static askPermission() {
        return new Promise(function (resolve, reject) {
            const permissionResult = Notification.requestPermission(function (result) {
                resolve(result);
            });

            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        }).then(function (permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error("We weren't granted permission.");
            }
        });
    }

    static makeNotification(params: NotificationParams) {
        const options = {
            body: params.body,
            icon: params.icon,
        }
        const notification = new Notification(params.title, options);
        notification.onclick = (event) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open(params.url);
        }
    }

    static async longPollSubs() {
        const lastId: number = window.sessionStorage.getItem('lastSubId') !== null ? parseInt(window.sessionStorage.getItem('lastSubId')!) : 0;
        let response = await Requests.hasNewSubs(lastId);

        if (response.status !== 200) {
            if (response.status !== 401) {
                return;
            }
        } else {
            if(response.ids.length > 0){
                window.sessionStorage.setItem('lastSubId', response.ids[0].toString());
                if (lastId !== 0){
                    for (const id of response.ids.reverse()){
                        NotificationModule.#makeNewSubNotification(id);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
        NotificationModule.longPollSubs();
    }

    static #makeNewSubNotification(id: number){
        const params: NotificationParams = {
            title: 've.ru',
            body: 'У вас в подписках новая статья!',
            url: APIStrings.articlePage(id, false),
            icon: '/favicon.ico',
        }
        NotificationModule.makeNotification(params);
    }
}
