import frappe

def execute(filters=None):
    
    columns = [
        {
            "label": "Maintenance Type",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Breakdown Slip",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Shift",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Reporting Date",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Report Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Closing Date",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Closing Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Breakdown Minutes",
            "width": 110,
            "align": "left"
        },
        {
            "label": "Section",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Machine ID",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Machine Name",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Segment",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Department",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Report by",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Production Start Date and Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Work Start Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Work End Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Handover Time",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Attended By",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Production Incharge",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Maintenance Incharge",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Auxiliaries Name",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Breakdown Group",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Category",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Horizontal Deployment",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Deployment Action",
            "width": 100,
            "align": "left"
        },
        {
            "label": "Read Status",
            "width": 100,
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

    query =""" SELECT section_name as section_name, agreement_area as agreement_area, damage as damage_area, netarea as net_area, ploar1 as plot_over_area FROM `tabSection Wise Cane Registration`"""

    mydata =frappe.db.sql(query,as_dict=True)

    data = [columns, mydata]

    return data
