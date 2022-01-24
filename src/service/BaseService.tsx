import { db } from "../firebase/firebase";

export class BaseService {

    get(collectionName: string) {
     return db.collection(collectionName).get()
            .then((data) => {
                const lst:any = [];
                data.forEach((doc: any) => {
                    lst.push(doc.data())
                });
               return lst;
            })
    }
}

export const baseService = new BaseService();