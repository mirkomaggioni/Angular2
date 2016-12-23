import { Customer } from "../customer/customer.model";

export class Invoice {
    Id: string;
    IdAttachment: string;
    IdCustomer: string;
    Number?: number;
    Year?: number;
    EmissionDate: Date;
    DueDate: Date;
    PaymentDate?: Date;
    Customer: Customer;
}