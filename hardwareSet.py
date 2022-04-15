class HWSet:
    def __init__(self, document):
        print(document)
        self.capacity = document["capacity"]
        self.availability = document["availability"]
        self.checkedout_qty = document["checkedout_qty"]
        print(self.checkedout_qty)
        print(type(self.checkedout_qty))

    def get_availability(self):
        return self.availability

    def get_capacity(self):
        return self.capacity

    def get_checkedout_qty(self, id):
        if(self.checkedout_qty.get(id)):
            return self.checkedout_qty[id]
        else:
            return 0

    def init_project(self, id):
        self.checkedout_qty[id] = 0


    def check_out(self, qty, id):
        if self.availability < qty:
            self.checkedout_qty[id] += self.availability
            self.availability = 0
            return -1
        else:
            self.availability -= qty
            self.checkedout_qty[id] += qty
            return 0

    def check_in(self, qty, id):
        checked_out_for_project = self.checkedout_qty[id]
        print(type(checked_out_for_project))
        if checked_out_for_project < qty:
            self.availability += checked_out_for_project
            self.checkedout_qty[id] = 0
            return -1
        else:
            self.availability += qty
            self.checkedout_qty[id] -= qty
            return 0

    def __str__(self):
        return (
            "capacity: "
            + str(self.capacity)
            + " availability: "
            + str(self.availability)
            + " checkedout_qty: "
            + str(self.checkedout_qty)
        )

    def jsonify(self):
        return {"capacity": self.capacity, "availability": self.availability, "checkedout_qty": self.checkedout_qty}