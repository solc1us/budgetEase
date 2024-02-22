package budgetEase.mainapp.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import budgetEase.mainapp.models.Cashflow;
import budgetEase.mainapp.models.ToDoList;
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

  public List<ToDoList> findToDoListByDateRange(List<ToDoList> toDoLists, LocalDate dateFrom, LocalDate dateTo) {
    List<ToDoList> filteredToDoLists = new ArrayList<>();
    for (ToDoList toDoList : toDoLists) {
      if (toDoList.getDeadline().isAfter(dateFrom.minusDays(1)) && toDoList.getDeadline().isBefore(dateTo.plusDays(1))) {
        filteredToDoLists.add(toDoList);
      }
    }
    return filteredToDoLists;
  }

  public List<ToDoList> findToDoListByKegiatan(List<ToDoList> toDoLists, String keyword) {
    List<ToDoList> filteredToDoLists = new ArrayList<>();
    for (ToDoList toDoList : toDoLists) {
      if (toDoList.getKegiatan() != null && toDoList.getKegiatan().contains(keyword)) {
        filteredToDoLists.add(toDoList);
      }
    }
    return filteredToDoLists;
  }

  public List<ToDoList> findToDoListByIsCheck(List<ToDoList> toDoLists, boolean isCheck) {
    List<ToDoList> filteredToDoLists = new ArrayList<>();
    for (ToDoList toDoList : toDoLists) {
      if (toDoList.isCheck() == isCheck) {
        filteredToDoLists.add(toDoList);
      }
    }
    return filteredToDoLists;
  }

  public List<Cashflow> findCashflowByArus(List<Cashflow> cashflows, String keyword) {
    List<Cashflow> filteredCashflows = new ArrayList<>();
    for (Cashflow cashflow : cashflows) {
      if (cashflow.getArus() != null && cashflow.getArus().contains(keyword)) {
        filteredCashflows.add(cashflow);
      }
    }
    return filteredCashflows;
  }
  
  public List<Cashflow> findCashflowByKategori(List<Cashflow> cashflows, String keyword) {
    List<Cashflow> filteredCashflows = new ArrayList<>();
    for (Cashflow cashflow : cashflows) {
      if (cashflow.getKategori() != null && cashflow.getKategori().contains(keyword)) {
        filteredCashflows.add(cashflow);
      }
    }
    return filteredCashflows;
  }

  public List<Cashflow> findCashflowByDateRange(List<Cashflow> cashflows, LocalDate dateFrom, LocalDate dateTo) {
    List<Cashflow> filteredCashflows = new ArrayList<>();
    for (Cashflow cashflow : cashflows) {
      if (cashflow.getTanggal().isAfter(dateFrom.minusDays(1)) && cashflow.getTanggal().isBefore(dateTo.plusDays(1))) {
        filteredCashflows.add(cashflow);
      }
    }
    return filteredCashflows;
  }
  
}
