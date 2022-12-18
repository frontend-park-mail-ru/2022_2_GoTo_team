
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

    static makeNotification(title: string){
        const notification = new Notification('Уведомление');
    }

    static  async longPollSubs() {
        let response = await fetch("/subscribe");

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
