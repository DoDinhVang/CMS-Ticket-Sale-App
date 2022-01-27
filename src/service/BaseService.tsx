import { db } from "../firebase/firebase";

export class BaseService {

    get(collectionName: string) {
        return db.collection(collectionName).get()
            .then((data) => {
                const lst: any = [];
                data.forEach((doc: any) => {
                    lst.push(doc.data())
                });
                return lst;
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }


    searchByTicketNumber(collectionName: string, soVe: string) {
        if(soVe === ''){
            return this.get(collectionName)
        }
        return db.collection(collectionName).where("soVe", "==", soVe).get()
            .then((data) => {
                const lst: any = [];
                data.forEach((doc: any) => {
                    lst.push(doc.data())
                })
                return lst
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    filterTicKet(){
        
    }

}

export const baseService = new BaseService();