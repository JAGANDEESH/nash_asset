import frappe

def execute(filters=None):
    
    columns = [
        {
            "label": "Maintenance Type",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Breakdown Slip",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Shift",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Reporting Date",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Report Time",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Closing Date",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Closing Time",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Breakdown Minutes",
            "width": 110,
            "align": "left"
        },
        {
            "label": "Section",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Segment",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Tooling ID",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Tooling Name",
            "width": 150,
            "align": "left"
        },
        
        {
            "label": "Department",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Reported by",
            "width": 150,
            "align": "left"
        },

        {
            "label": "Work Start Time",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Work End Time",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Handover Time",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Production Start Time",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Attended By",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Reported by",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Production Incharge",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Maintenance Incharge",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Number of Shots",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Horizontal Deployment",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Deployment Action",
            "width": 150,
            "align": "left"
        },
        {
            "label": "Read Status",
            "width": 150,
            "align": "left"
        }
    ]

    data = [
          {
            "Maintenance Type": "Johnson",
            "Breakdown Slip": "Saturday",
            "Shift": "2024-04-27",
            "Reporting Date":"15:00:00",
            "Reporting Time": "17:00:00",
            "Closing Date": "00:10:00",
            "Closing Time": "00:00:00",
            "Section": 0,
            "Segment": 2.0
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
