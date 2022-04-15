class HWSet:
    def __init__(self, document):
        self._id = document["_id"]
        self.capacity = document["capacity"]
        self.availability = document["availability"]
        self.checkedout_qty = document["checkedout_qty"]

    def get_availability(self):
        return self.availability

    def get_capacity(self):
        return self.capacity

    def get_checkedout_qty(self):
        return self.checkedout_qty

    def check_out(self, req):
        print("testing2: " + str(req))
        qty = int(req["number"])
        if self.availability < qty:
            self.checkedout_qty[req["_id"]] = self.checkedout_qty.get(req["_id"], 0) + self.availability
            self.availability = 0
            return -1
        else:
            self.checkedout_qty[req["_id"]] = self.checkedout_qty.get(req["_id"], 0) + qty
            self.availability -= qty
            return 0

    def check_in(self, req):
        qty = int(req["number"])
        if self.checkedout_qty.get(req["_id"], 0) < qty:
            self.availability += self.checkedout_qty.get(req["_id"], 0)
            self.checkedout_qty[req["_id"]] = 0
            return -1
        else:
            self.availability += qty
            self.checkedout_qty[req["_id"]] = self.checkedout_qty.get(req["_id"], 0) - qty
            return 0

    def __str__(self):
        return (
            str(self._id) 
            + ": "
            + "capacity: "
            + str(self.capacity)
            + " availability: "
            + str(self.availability)
            + " checkedout_qty: "
            + str(self.checkedout_qty)
        )

    def jsonify(self):
        return {"_id": self._id, "capacity": self.capacity, "availability": self.availability, "checkedout_qty": self.checkedout_qty}