import hardwareSet as hwSet
import inspect
import pytest_check as check

def test_example():
    hw1= hwSet.HWSet({"capacity": 100, "availability": 100, "checkedout_qty": {"0": 0, "1": 0} })
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

