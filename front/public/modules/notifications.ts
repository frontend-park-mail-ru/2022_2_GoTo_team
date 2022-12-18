import {Requests} from "./requests";

export type NotificationParams = {
    title: string,
    body: string,
    url: string,
    icon: string,
}

export class NotificationModule{
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

    static makeNotification(params: NotificationParams){
        const options = {
            body:  params.body,
            icon: params.icon,
        }
        const notification = new Notification(params.title, options);
        notification.onclick = (event) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open(params.url);
        }
    }

    static  async longPollSubs() {
        const lastId: number = window.sessionStorage.getItem('lastId') !== null ? parseInt(window.sessionStorage.getItem('lastId')!) : 0;
        let response = await Requests.hasNewSubs(lastId);

        if (response.status == 502) {
            await NotificationModule.longPollSubs();
        } else if (response.status != 200) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await NotificationModule.longPollSubs();
        } else {
            await NotificationModule.longPollSubs();
        }
    }
}
