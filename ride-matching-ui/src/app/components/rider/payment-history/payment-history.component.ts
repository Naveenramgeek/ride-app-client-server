import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/payments.model';
import { ActivatedRoute } from '@angular/router';
import { Rider } from '../../../models/rider.model';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent implements OnInit {

  rider!: Rider;
  payments!: Payment[];
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.rider = data['paymentsData'].rider; // Access resolved data
      this.payments = data['paymentsData'].payments;
    });
  }
  selectedStatus: 'ALL' | 'SUCCESSFUL' | 'FAILED' | 'PENDING' = 'ALL';
  sortOption: 'DATE' | 'PAYABLE_AMOUNT' | 'PAYMENT_METHOD' = 'DATE';

  // Filter Payments by Status
  get filteredPayments(): Payment[] {
    let filtered = this.selectedStatus === 'ALL'
      ? this.payments
      : this.payments.filter((payment) => payment.paymentStatus === this.selectedStatus);

    return this.sortPayments(filtered);
  }

  // Sort Payments
  sortPayments(payments: Payment[]): Payment[] {
    switch (this.sortOption) {
      case 'DATE':
        return payments.sort((a, b) => (new Date(b.paymentDate)).getTime() - (new Date(a.paymentDate)).getTime());
      case 'PAYABLE_AMOUNT':
        return payments.sort((a, b) => b.payableAmount - a.payableAmount);
      case 'PAYMENT_METHOD':
        return payments.sort((a, b) => a.paymentMethod.localeCompare(b.paymentMethod));
      default:
        return payments;
    }
  }

  // Change Status Filter
  changeStatus(status: 'ALL' | 'SUCCESSFUL' | 'FAILED' | 'PENDING'): void {
    this.selectedStatus = status;
  }

  // Change Sort Option
  changeSortOption(option: 'DATE' | 'PAYABLE_AMOUNT' | 'PAYMENT_METHOD'): void {
    this.sortOption = option;
  }
}
