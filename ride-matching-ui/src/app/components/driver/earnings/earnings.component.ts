import { Component } from '@angular/core';
import { Payment } from '../../../models/payments.model';
import { ActivatedRoute } from '@angular/router';
import { Driver } from '../../../models/driver.model';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss'
})
export class EarningsComponent {
  driver!: Driver;
  payments!: Payment[];

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.driver = data['paymentsData'].rider; // Access resolved data
      this.payments = data['paymentsData'].payments;
    });
  }
  
  // Selected filter for earnings (Daily, Weekly, Monthly)
  selectedFilter: 'daily' | 'weekly' | 'monthly' = 'daily';

  // Calculate totals based on filter
  get filteredEarnings(): Payment[] {
    // const now = new Date();
    // const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // const startOfWeek = new Date(startOfDay);
    // startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    // const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // switch (this.selectedFilter) {
    //   case 'daily':
    //     return this.payments.filter((p) => p.paymentDate >= startOfDay);
    //   case 'weekly':
    //     return this.payments.filter((p) => p.paymentDate >= startOfWeek);
    //   case 'monthly':
    //     return this.payments.filter((p) => p.paymentDate >= startOfMonth);
    //   default:
    //     return [];
    // }
    return this.payments.filter((p) => p.paymentStatus === 'COMPLETED')
  }

  get totalEarnings(): number {
    return this.payments.filter((p) => p.paymentStatus === 'COMPLETED').reduce((total, p) => total + p.driverShare, 0);
  }

  get pendingPayments(): Payment[] {
    return this.payments.filter((p) => p.paymentStatus === 'PENDING');
  }
}
