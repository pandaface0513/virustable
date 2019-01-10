from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    latest_virus_list = [
        {
            'date': 'Jan 1, 2015 13:10:59',
            'filename': 'virus.exe',
            'action': 'files-deleted',
            'submit-type': 'FG300B3910602113/root',
            'rating': 'high-risk'
        },
        {
            'date': 'Jan 1, 2015 13:12:59',
            'filename': 'helper.exe',
            'action': 'files-added',
            'submit-type': 'FG300B3910602113/root',
            'rating': 'low-risk'
        },
        {
            'date': 'Jan 1, 2015 13:12:59',
            'filename': 'helper.exe',
            'action': 'files-added',
            'submit-type': 'FG300B3910602113/root',
            'rating': 'malicious'
        },
        {
            'date': 'Jan 1, 2015 13:12:59',
            'filename': 'helper.exe',
            'action': 'files-added',
            'submit-type': 'FG300B3910602113/root',
            'rating': 'clean'
        },
        {
            'date': 'Jan 1, 2015 13:12:59',
            'filename': 'helper.exe',
            'action': 'files-added',
            'submit-type': 'FG300B3910602113/root',
            'rating': 'medium-risk'
        }
    ]
    context = {
        'latest_virus_list': latest_virus_list
    }
    return render(request, 'vtableapp/index.html', context)
