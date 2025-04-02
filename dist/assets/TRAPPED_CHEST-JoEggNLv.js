const A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABI1BMVEVHcEwbGBNuTh0tKCBrRxQ4KQupeCyNaB0cGBRcQxOlbR+icSdEMBI2MCdpSRlCKwx9XiJBLQ8aFxNgRR0RDwugaiNRPRYyJg0yLSVbPhhAKg6Tay1oRRYRDww7KxIjHxg4Jg81LiUqJh5MOh8VEw+OZSkUEg8vJBM0LiZePxYQDgshHRhcQRuQYiOCYS45KBFDNRosJh4nFgcvLy+MYCY6IAlMTEwcGBNBQUE3LiU6Jw4sJh8ZDgsjHxlWVlYMCwkvHAs1NTUuIRApGg4tIhI6JQpKNx0PDgwNCwkZFhM1JAw1Hw1qamqjo6MjHhgzJA9TOhg1LyYqJh8sJx85OTk0JxNVPx5NTU1LNhoxLCY3Jw5EKxAnJB0pJR3Ly8tRUVFBKA7jqttBAAAAAXRSTlMAQObYZgAAB4ZJREFUaN7t2WlfGkkQBvAww6mEUwFBEBRQA4Kay5jEmJj7Tsx97vf/FFvPU90zA4bB88X+NvUiMatbf6aqu7rBS5f+xt/4G/+/+PHjQtNf/iFRubj0iAri4tIPJCqVVqt1MelzOQAbGwJcvnz+6Ts5xAaiw2Kdc3pEbl5ig1+eXy9McXK5Tgfp52dnZzt8mAq+ceb0lYpJn+Orn5+ZESCRkH/WajX51hnb/Q510PQzSJ+YkZD8iUS8hkC7W6cv1DuESY9A4sQsIo6osd+n7wUqHJI+jnZv4DFOR3itNenjcZue/4izIXEUCu0+MVHx172+erxkpk+wDbqc+CD8IS7a1glWjoSu+7Hi8KuEXa2mWDn+KNrdOmH6jikOyyOEpucT2GLN8ME6nWsSrWPtC6bHMAik9wiTfsY+jf1yfl7y676YQrxH+gGXX6D2PqGmXyx9EFaM+2IQPqPeIwYcmH9cmP4jBdN7j1Qb6DCfvKJc973OfHngP677+ZmRcsm3vRcyi0cYDNYkKt3uRMBdFmBtTYBc7mj6eYyIuFcfUzH9stMR4OtXyZ/shgLLy3gRusVmPUDnnPdIs+PpuVLXvkokk1OB5WV/F8+aRcIxamt9ND0Cr2stmSRwZQogBKco1oVJzx7rdh5Pj5/KYZdp+mTyypUQIJUi4Lo8BzCQN0z6OBugf/OB/PQ17mKTPp2eDNwGQEIoF3VqYUfU/JXj91v/S248fTYLYG4ScPt2ikHAdfl/8iUeTe/NuWD6fBbA3FwIsLioBIHDQ44XDOScrh9vtSY4qWtsbatQ0OLkAWSzU4Bo1CMOD7Gi9NDsdHTX8tXb2t+6dWttLRIhkE4DqFbDANcloEQmQ2DZxYLipeWaP/xY+zXJfysZIZBG5KtVAvX65FVUIgAiI3Go/ea+wEC+Fqi9XfcAvjF/lZEd1kOBUkmFKICMowvKvYxOYiDXxtIDeP7tm5e+OhyGAJKtVBohHMdx7YrSfTEYSHrW3rT2+XMA16/b9ALcuzcRWH5dGiEcxye823ULtS8UCOTzALavE9jdRf7uvVDg9RKAYtEQzhGC677ASMbyALa3CZTLAGTSTQZcAktLAEaJjCV+Spj0hVgMwPY2ge0ygG6XQEiTCSwtFYujhLSDQK/382cyadMLIJkRr7YBtNsEQlfRysrSkkfYXiwCiEYJ9JIEmD6WvU7gFULSE1hdnQxsAXj8WIW7APQpFhcXAUQdC6Q1fZbAr1+/Xr3a2WkTWF0FMGknb21tAXjMp7h79y57USLAHe44BQLptKYH8OKlAL93FFhlTB4VAiwsAEChBOj1WKfSogYAM3Y0fTb74sWLly9f/lbgAdO/eTMFEGIFQUB6wX1hBQNUNX2j4QH37z94AKDZDANcl8DCwooSAJa4L9bXtUocnJEqgXIZwJ09AT7fV6DZJBB2ZDoLAWKzp/0GsN4nwAAgq1KAO3fu7O3tfVagyXjTCD2TZc37xObmplm0APp9Hygz2m0fuKrpm+lGCCDDjvvWEpubAaKPUMCm94GrVxWQqRoOLKecALG+GSB6ADCdk0mbXoCDgxs39nZ2FMjnAZTDgRSJaJTAuhJfCPR6ABA2fXv1AMANBWQuASiHAC4BEDjTCJD48mWFAHcZr25ts60CQP44gN6LJPRcXtcAsLJCoNvFJCLAXXWwvy/Ahw8K4M4yDchk7DPwTxUWvnDVEugWCDx8iPzN/QCA6SHAcDgZ2AJAAhNau0HAbj0LrD4EIG31gH90+snNBUDIqNCjPqVHgJ41BAyRBJBcBcBlub//6LsA3830RhuGw9BZZI96AvxK/vS3njZZALOtHj169P27SR9jm/PN5hTAHvUZrZb+rcJbC+xq+mwWQD4fSF+thgEy7MwJJsGrl17xLPH2bYQ3od1d3bUAkNUD5OYIIOzIdMwJBkBy66LVahFgAMBVLpvVl20AmbAAGqFnMncxh38qGNoOH0ib8PPrEVSt5htTAccxJ1gA0MYUiwpo8liMQCA9n2gKUHICRDQARAkUChh2mp7ASHo2ovFx2uVXO2zOeS1QACjYQ5/AaHoAjY8hQMTVyy877Ohbhah2gECppEDM5k+Ppo/FGg0CTycBkYjefUs6LczNLmX3nALm1qV90OPZpB8OCTx9GgIYolhMsVDB9woZBeyl1L7l8NKXywTk9U8EKNy8WdLLr26FING3gI5+847GFKdM4MkTACEfGAG4GSnp5ddbQYbo9/XWboYCI21rD6D+BMCUj7wARCJFvfwGCLmfEuC7jjw3raRnnxsNAjIiBDjGh3Y32YuiXn49QpbtggWqOhV0IeF+JCEjToBjfuyovShqLwwBYCFws6vqXm7wAob0Apzgg9OjvcgQ8G52upu19pp+7oQf/Y73giPbAjqNTO3rp0k/1ot+H8DosDO1l8FwuvTezosQ6BcB6M1O05va1ye/oTk+QQBhP3PS22mjzqVzxl+BKEHg0ycF2Fmp/VmK84dCjQH1+hmLM048exYEWPv6pfMLAM8iFpg7j9qPB4BIG/nnTrvupxICtNsXlp6FMsAF/kIZwN/f2v/X4l/qiqOY3fCOSQAAAABJRU5ErkJggg==";export{A as default};
