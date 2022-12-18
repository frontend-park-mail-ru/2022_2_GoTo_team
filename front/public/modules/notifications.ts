
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
}
