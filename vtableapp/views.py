from django.shortcuts import render
from django.http import JsonResponse

import os
import re
import json

# Create your views here.
def index(request):
    vdata_list = readMetafiles()
    return JsonResponse({
        'vlist': vdata_list
    })

def readMetafiles():
    path = "static/vdata"
    file_list = os.listdir(path)
    print("hi")
    combined_data = []
    for name in file_list:
        fullname = os.path.join(path, name)
        with open(fullname) as f:
            json_decode = json.load(f)
            for json_obj in json_decode:
                combined_data.append(json_obj)
    return combined_data