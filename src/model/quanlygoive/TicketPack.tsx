const timeStamp = Date.now()

export interface TicketPack {
    maGoi: string
    maSuKien: string
    tenSuKien: string
    tenGoi: string
    ngayApDung: any
    ngayHetHan: any
    trangThai: boolean
    giaCombo?: {
        giaVe: number,
        soVe: number
    }
    giaVe: number
}
export class InfoTicketPack implements TicketPack {
    maGoi: string = ''
    maSuKien: string = ''
    tenSuKien: string = ''
    tenGoi: string = ''
    ngayApDung: any = new Date()
    ngayHetHan: any = new Date()
    trangThai: boolean = false
    giaCombo? = {
        soVe: 0 ,
        giaVe: 0
    }
    giaVe: number = 0

}
