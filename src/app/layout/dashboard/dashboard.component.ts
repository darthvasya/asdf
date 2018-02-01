import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { StatisticService } from "./../../shared/core/statistic.service";
import { HubConnection, TransportType } from "@aspnet/signalr-client";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    hours: {};
    orders: {};
    customers: {};
    private hubConnection: HubConnection;



  constructor(
    private statisticService:StatisticService,
  ) { }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  ngOnInit() {
    /* ----------==========     Количество заказов за сутки    ==========---------- */
    let dataCompletedTasksChart: any;
    this.statisticService
    .getHoursOrders()
    .then(hours => {
        this.hours = hours;
        dataCompletedTasksChart = {
            labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
            series: [
                [this.hours[0].count,
                 this.hours[1].count,
                 this.hours[2].count,
                 this.hours[3].count,
                 this.hours[4].count,
                 this.hours[5].count,
                 this.hours[6].count,
                 this.hours[7].count,
                 this.hours[8].count,
                 this.hours[9].count,
                 this.hours[10].count,
                 this.hours[11].count]
            ]
        };
        const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);
    })
    .catch(err => {
        console.log(err);
    });

      /* ----------==========     Количество заказов за последние 7 дей    ==========---------- */

      let dataDailySalesChart: any;
      this.statisticService
      .getWeekOrders()
      .then(orders => {
          this.orders = orders;
          dataDailySalesChart= {
            labels: [new Date(this.orders[0].date).toLocaleString('ru', {weekday: 'short'}),
                    new Date(this.orders[1].date).toLocaleString('ru', {weekday: 'short'}),
                    new Date(this.orders[2].date).toLocaleString('ru', {weekday: 'short'}),
                    new Date(this.orders[3].date).toLocaleString('ru', {weekday: 'short'}),
                    new Date(this.orders[4].date).toLocaleString('ru', {weekday: 'short'}),
                    new Date(this.orders[5].date).toLocaleString('ru', {weekday: 'short'}),
                    new Date(this.orders[6].date).toLocaleString('ru', {weekday: 'short'})],
            series: [
                [this.orders[0].count,
                this.orders[1].count,
                this.orders[2].count,
                this.orders[3].count,
                this.orders[4].count,
                this.orders[5].count,
                this.orders[6].count]
            ]
        };
        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 12, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }
      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
      this.startAnimationForLineChart(dailySalesChart);
      })
      .catch(err => {
          console.log(err);
      });

      /* ----------==========     Количество новых пользователей    ==========---------- */

      let dataEmailsSubscriptionChart : any;
      this.statisticService
      .getNewCustomers()
      .then(customers => {
          this.customers = customers;
           dataEmailsSubscriptionChart = {
            labels: [new Date(this.customers[0].date).toLocaleString('ru', {weekday: 'short'}),
                        new Date(this.customers[1].date).toLocaleString('ru', {weekday: 'short'}),
                        new Date(this.customers[2].date).toLocaleString('ru', {weekday: 'short'}),
                        new Date(this.customers[3].date).toLocaleString('ru', {weekday: 'short'}),
                        new Date(this.customers[4].date).toLocaleString('ru', {weekday: 'short'}),
                        new Date(this.customers[5].date).toLocaleString('ru', {weekday: 'short'}),
                        new Date(this.customers[6].date).toLocaleString('ru', {weekday: 'short'})],
            series: [
                [this.customers[0].count,
                this.customers[1].count,
                this.customers[2].count,
                this.customers[3].count,
                this.customers[4].count,
                this.customers[5].count,
                this.customers[6].count]
            ]
          };
          var optionsEmailsSubscriptionChart = {
              axisX: {
                  showGrid: false
              },
              low: 0,
              high: 5,
              chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
          };
          var responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];
          var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);
          this.startAnimationForBarChart(emailsSubscriptionChart);
      })
      .catch(err => {
          console.log(err);
      });
  }
}
