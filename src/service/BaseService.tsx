import { db } from "../firebase/firebase";
import { FilterTicket } from "../model/quanlyve/FilterTicket";
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
        if (soVe === '') {
            return this.get(collectionName)
        }
        return db.collection(collectionName).where("soVe", ">=", soVe).where('soVe', "<=", soVe + '\uf8ff').get()
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

    filterTicKet(collectionName: string, values: FilterTicket) {

        if (values.checkTicket === '' && values.eventId === '') {
            if (values.ticketStatus === '') {
                return db.collection(collectionName).where("congCheckInId", "in", values.checkInGateId).get()
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
            return db.collection(collectionName).where("congCheckInId", "in", values.checkInGateId).where('tinhTrangSuDung', '==', values.ticketStatus).get()
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
        } else {
            if (values.checkTicket === '') {
                return db.collection(collectionName).where("maSuKien", "==", values.eventId).get()
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
            return db.collection(collectionName).where("tinhTrangDoiSoat", "==", values.checkTicket).where('maSuKien', '==', values.eventId).get()
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
    }



}

export const baseService = new BaseService();