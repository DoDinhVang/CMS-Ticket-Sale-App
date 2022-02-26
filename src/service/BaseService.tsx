import { Console } from "console";
import { type } from "os";
import { db } from "../firebase/firebase";
import { TicketPack } from "../model/quanlygoive/TicketPack";
import { FilterTicket } from "../model/quanlyve/FilterTicket";
import { TicketList } from "../model/quanlyve/TicketList";
import { STATUS_CODE } from "../util/config";
import firebase from "firebase";
export class BaseService {

    get(collectionName: string) {
        return db.collection(collectionName).get()
            .then((data) => {
                const lst: any = [];
                data.forEach((doc: any) => {
                    lst.push({ ...doc.data(), docId: doc.id })
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
                    lst.push({ ...doc.data(), docId: doc.id })
                })
                return lst
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    filterTicKet(collectionName: string, values: FilterTicket) {
        console.log('params', values)
        const matchesCollection = db.collection(collectionName);
        let query: any = matchesCollection;
        for (const key in values) {

            const value = values[key as keyof FilterTicket]
            if (value === "") { 
                continue;
            }
            if (key === 'congCheckInId') {
                query = query.where(key, 'in', value)
            } else if (key === 'ngaySuDung') {

                const startTime = values.ngaySuDung?.startTime
                const endTime = values.ngaySuDung?.endTime

                if (startTime !== undefined) {
                    const modifiedStartTime = firebase.firestore.Timestamp.fromDate(startTime)
                    query = query.where(key, '>=', modifiedStartTime)
                }
                if (endTime !== undefined) {
                    const modifiedEndTime = firebase.firestore.Timestamp.fromDate(endTime)
                    query = query.where(key, '<=', modifiedEndTime)
                }
            } else {
                query = query.where(key, '==', value)
            }
        }
        return query.get().then((data: any) => {
            const lst: any = [];
            data.forEach((doc: any) => {
                lst.push({ ...doc.data(), docId: doc.id })
            })
            return lst
        }).catch((error: any) => {
            console.log(error)
        })




    }


    update(collectionName: string, values: any, docId: string) {
        return db.collection(collectionName).doc(docId).update({ ...values }).then(() => {
            return {
                status: 200,
                message: 'cập nhật thành công'
            }
        }).catch((error) => {
            return {
                status: 500
            }
        })
    }

    updateTicketPack({ docId, ...resParam }: TicketPack) {
        return this.update('danhSachGoi', resParam, docId);

    }
    updateTicketList({ docId, ...resParams }: TicketList) {
        return this.update('danhSahVe', resParams, docId)
    }




}

export const baseService = new BaseService();