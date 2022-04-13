class HWSet:
    def __init__(self, capacity, availability, checkedout_qty):
        self.capacity = capacity
        self.availability = availability
        self.checkedout_qty = checkedout_qty

    def get_availability(self):
        return self.availability

    def get_capacity(self):
        return self.capacity

    def get_checkedout_qty(self):
        return self.checkedout_qty

    def check_out(self, qty):
        if self.availability < qty:
            self.checkedout_qty += self.availability
            self.availability = 0
            return -1
        else:
            self.availability -= qty
            self.checkedout_qty += qty
            return 0

    def check_in(self, qty):
        self.availability += qty

    def __str__(self):
        return (
            "capacity: "
            + str(self.capacity)
            + " availability: "
            + str(self.availability)
            + " checkedout_qty: "
            + str(self.checkedout_qty)
        )
