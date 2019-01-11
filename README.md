# virustable
## About This Project
This github repo will created to complete a 48 hours remote test for a Web UI Developer Position.

**The requirement is as following:**
* Using Python/Django, Javascript/jQuery, CSS, HTML
* Develop a program that reads “threat” meta files and renders them in a table using Ajax.
* Each row should also be color-coded based on the record's threat level (rating)
* The table should also allow sorting
* If a new record is detected and should be included in the table based on its state (time-period, an alert should be presented to the user informing them to reload the table).

**What was completed:**
+ Django serves a Frontend page that utlizes Javascript/jQuery
+ Once the page loads, it will request for virus data
+ Django Backend will read all files from a predefined directory and compiled the lists of json objets into a single list
+ The Frontend page will receive the JSONResponse and use it to render the table
+ Sorting and Filtering are done in the Frontend with Javascript/jquery
+ The color-coded table rows are done with CSS classes
- I wasn't sure work on new record detection, here is my thought process
   - Django monitors the predefined directiory (maybe listDir every few seconds?)
   - Once it finds a difference from last listDir result
   - Send a message to the Frontend page
   - Frontend page receives the message and send an alert to users

**What I might do differently:**
* I think I could have made two Django apps, one for Frontend, one for the Backend
* I should be able to do the new record detection easier then
* The filtering could be done in Django Backend, minimalizing package size; Frontend pass in filter parameter via AJAX request

## Instruction To Test
0. Prerequisites:
    * Python 3 [https://www.python.org/downloads/]
    * Django [https://www.djangoproject.com/download/]
1. Downlad or Git Clone this entire repo
2. In the root folder, there is a static folder - *static/vdata* folder is where the meta data files are stored
3. Each meta data file contains a list of JSON records
4. Sample Metafile Record:
```
[
    {
        "date": "Jan 1, 2015 13:10:59",
        "filename": "virus.exe",
        "action": "files-deleted",
        "submit-type": "FG300B3910602113/root",
        "rating": "high-risk"
    },
    {
        "date": "Jan 1, 2015 13:12:59",
        "filename": "helper.exe",
        "action": "files-added",
        "submit-type": "FG300B3910602113/root",
        "rating": "low-risk"
    }
]
```
5. Once you are ready with the meta data files, you can run the following code in your terminal and run `python manage.py runserver` at the root folder of this repo
