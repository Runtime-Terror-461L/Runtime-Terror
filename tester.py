import hardwareSet as hwSet
import inspect
import pytest_check as check

def test_example():

    #normal testing cases
    hw1= hwSet.HWSet({"capacity": 110, "availability": 100, "checkedout_qty": {"0": 0, "1": 0, "2" : 10} })
    check.equal(hw1.get_availability(),100, "initial availibility wrong")
    check.equal(hw1.check_out(20, "0"),0, "checked out incorrectly")
    check.equal(hw1.get_availability(), 80, "avaliablity wrong after checking out")
    check.equal(hw1.check_out(30, "0"), 0, "checking out wrong")
    check.equal(hw1.get_availability(), 50, "availbility wrong")
    check.equal(hw1.check_in(25, "0"), 0, "check in function wrong")
    check.equal(hw1.check_in(20, "0"), 0, "check in function wrong id wise")
    check.equal(hw1.get_availability(), 95, "availability wrong after chekcing in")
    check.equal(hw1.check_in(30, "1"), -1, "check in wrong")
    check.equal(hw1.get_availability(), 95, "availbility wrong after checking in")
    check.equal(hw1.check_out(20, "1"),0, "checked out incorrectly")
    check.equal(hw1.get_availability(), 75, "avaliablity wrong after checking out")
    check.equal(hw1.check_out(30, "1"), 0, "checking out wrong")
    check.equal(hw1.get_availability(), 45, "availbility wrong")
    check.equal(hw1.check_in(25, "1"), 0, "check in function wrong")
    check.equal(hw1.check_in(20, "1"), 0, "check in function wrong id wise")
    check.equal(hw1.get_availability(), 90, "availability wrong after chekcing in")
    check.equal(hw1.check_in(10, "2"), 0, "check in wrong")
    check.equal(hw1.get_availability(), 100, "availbility wrong after checking in")
    check.equal(hw1.check_out(20, "2"),0, "checked out incorrectly")
    check.equal(hw1.get_availability(), 80, "avaliablity wrong after checking out")
    check.equal(hw1.check_out(30, "2"), 0, "checking out wrong")
    check.equal(hw1.get_availability(), 50, "availbility wrong")
    check.equal(hw1.check_in(25, "2"), 0, "check in function wrong")
    check.equal(hw1.check_in(20, "2"), 0, "check in function wrong id wise")
    check.equal(hw1.get_availability(), 95, "availability wrong after chekcing in")
    check.equal(hw1.check_in(60, "2"), -1, "check in wrong")
    check.equal(hw1.get_availability(), 100, "availbility wrong after checking in")
    
    #more out of the ordinary test cases

    hw2= hwSet.HWSet({"capacity": 110, "availability": 100, "checkedout_qty": {"0": 0, "1": 0, "2" : 10} })
    check.equal(hw2.check_out(110, "1"), -1, "check in function wrong id wise")
    check.equal(hw2.get_availability(), 0, "availability wrong after chekcing in")
    check.equal(hw2.check_out(10, "2"), -1, "check in wrong")    
    check.equal(hw2.get_checkedout_qty("1"), 100, "qty wrong after checking out")
    check.equal(hw2.get_checkedout_qty("2"), 10, "qty wrong after checking out")
    check.equal(hw2.get_checkedout_qty("0"), 0, "qty  wrong after checking out")
    check.equal(hw2.check_in(10, "2"), 0, "check in function wrong id wise")
    check.equal(hw2.get_checkedout_qty("2"), 0)
    check.equal(hw2.check_out(-100, "0"), 0, "check in function wrong with negatives")

    check.equal(hw2.get_availability(), 110)


