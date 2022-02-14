export interface TicketPack{
    maGoi:string,
    maSuKien: string,
    tenGoi: string,
    ngayApDung: Date,
    ngaySuDung: Date,
    trangThai: boolean,
    giaCombo?: number,
    giaVe: number
}