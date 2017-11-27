export class ChangeOrderStateDTO {
           constructor(public OrderId: number, public State: string) {}

           isValid() {
               return true;
           }
       }
