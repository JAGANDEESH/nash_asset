import frappe

def execute(filters=None):
    
    columns = [
        {
            "label": "Status",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Work Order Number",
            "width": 100,
            "align": "left"
        },
        {
            "label": "WO Date",
            "width": 100,
            "align": "left"
        },
        {
            "label": "WO Request Number",
            "width": 100,
            "align": "left"
        },
        {
            "label": "WO Request Date",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Assign Department",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Machine Number",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Machine Type",
            "width": 110,
            "align": "left"
        },
        {
            "label": "Breakdown Date",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Breakdown Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Priority",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Description",
            "width": 100,
            "align": "left"
        },
        
        {
            "label": "Action",
            "width": 100,
            "align": "left"
        },
        
    ]

    data = [
          {
            # "Maintenance Type": "Johnson",
            # "Breakdown Slip": "Saturday",
            # "Shift": "2024-04-27",
            # "Reporting Date":"15:00:00",
            # "Reporting Time": "17:00:00",
            # "Closing Date": "00:10:00",
            # "Closing Time": "00:00:00",
            # "Section": 0,
            # "Segment": 2.0
        },
        #  {
        #     "employee": "Alex",
        #     "day": "Saturday",
        #     "date": "2024-04-27",
        #     "checkin":"15:00:00",
        #     "checkout": "17:00:00",
        #     "late_entry": "00:10:00",
        #     "early_exit": "00:00:00",
        #     "absent": 0,
        #     "over_time_hours": 2.0
        # },
        # {
        #     "employee": "Charles",
        #     "day": "Monday",
        #     "date": "2024-04-29",
        #     "checkin":"15:00:00",
        #     "checkout": "17:00:00",
        #     "late_entry": "00:10:00",
        #     "early_exit": "00:00:00",
        #     "absent": 0,
        #     "over_time_hours": 2.0
        # },
        #  {
        #     "employee": "Micheal",
        #     "day": "Tuesday",
        #     "date": "2024-04-30",
        #     "checkin":"15:00:00",
        #     "checkout": "17:00:00",
        #     "late_entry": "00:10:00",
        #     "early_exit": "00:00:10",
        #     "absent": 0,
        #     "over_time_hours": 2.0
        # },
        #  {
        #     "employee": "John Doe",
        #     "day": "Tuesday",
        #     "date": "2024-04-30-",
        #     "checkin":"15:00:00",
        #     "checkout": "17:00:00",
        #     "late_entry": "00:10:00",
        #     "early_exit": "00:00:00",
        #     "absent": 0,
        #     "over_time_hours": 2.0
        # },
        #  {
        #     "employee": "Iman",
        #     "day": "Wednesday",
        #     "date": "2024-05-01",
        #     "checkin":"15:00:00",
        #     "checkout": "17:00:00",
        #     "late_entry": "00:10:00",
        #     "early_exit": "00:00:00",
        #     "absent": 0,
        #     "over_time_hours": 2.0
        # },
       
    ]

    return [columns, data]
