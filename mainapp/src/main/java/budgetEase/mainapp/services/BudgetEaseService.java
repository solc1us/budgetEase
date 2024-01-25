package budgetEase.mainapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import budgetEase.mainapp.repos.UsersRepo;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class BudgetEaseService {

  @Autowired
  UsersRepo usersRepo;
  
}
