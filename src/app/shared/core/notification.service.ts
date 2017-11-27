import { Injectable } from '@angular/core';


declare var $: any;

@Injectable()
export class NotificationService {

    showNotification(from, align, message, type) {
        // const type = ['', 'info', 'success', 'warning', 'danger'];

        $.notify({
            icon: "notifications",
            message: message

        }, {
                type: type,
                timer: 2000,
                placement: {
                    from: from,
                    align: align
                }
            });
    }

}
