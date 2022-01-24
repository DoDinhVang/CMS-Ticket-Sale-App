import { DanhSachVeType } from "../types/danhSachVeType";

interface LayDanhSachVe{
    type: DanhSachVeType,
    danhSachVe: any
}

export type Action = LayDanhSachVe