package budgetEase.mainapp.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import budgetEase.mainapp.models.Cashflow;
import budgetEase.mainapp.repos.UsersRepo;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class BudgetEaseService {

  @Autowired
  UsersRepo usersRepo;

  // public List<Cashflow> findByIsSend(List<Cashflow> cashflows, boolean isSend) {
  //   List<Cashflow> filteredCashflows = new ArrayList<>();
  //   for (Cashflow cashflow : cashflows) {
  //     if (cashflow.isSend() == isSend) {
  //       filteredCashflows.add(cashflow);
  //     }
  //   }
  //   return filteredCashflows;
  // }

  public List<Cashflow> findByArus(List<Cashflow> cashflows, String keyword) {
    List<Cashflow> filteredCashflows = new ArrayList<>();
    for (Cashflow cashflow : cashflows) {
      if (cashflow.getArus() != null && cashflow.getArus().contains(keyword)) {
        filteredCashflows.add(cashflow);
      }
    }
    return filteredCashflows;
  }
  
  public List<Cashflow> findByKategori(List<Cashflow> cashflows, String keyword) {
    List<Cashflow> filteredCashflows = new ArrayList<>();
    for (Cashflow cashflow : cashflows) {
      if (cashflow.getKategori() != null && cashflow.getKategori().contains(keyword)) {
        filteredCashflows.add(cashflow);
      }
    }
    return filteredCashflows;
  }

  public List<Cashflow> findByDateRange(List<Cashflow> cashflows, LocalDateTime dateFrom, LocalDateTime dateTo) {
    List<Cashflow> filteredCashflows = new ArrayList<>();
    for (Cashflow cashflow : cashflows) {
      if (cashflow.getTanggal().isAfter(dateFrom) && cashflow.getTanggal().isBefore(dateTo)) {
        filteredCashflows.add(cashflow);
      }
    }
    return filteredCashflows;
  }
  
}
