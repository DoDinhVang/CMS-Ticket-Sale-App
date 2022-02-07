import { BaseService } from "./BaseService";

export class DanhSachVeSerVice extends BaseService{

    getTicketList(){
        return this.get('danhSachVe')
    }
}   