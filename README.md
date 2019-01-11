# virustable
## instruction
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