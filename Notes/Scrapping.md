URL for 'Time-series: Daily data' - https://waterdata.usgs.gov/nwis/dv?cb_00060=on&format=rdb&site_no=08251500&referred_module=sw&period=&begin_date=1899-07-01&end_date=2018-06-19

//mLab
mongodb://heroku_s3dksl6w:2te74o5brtf680ccloa11ull9n@ds219181.mlab.com:19181/heroku_s3dksl6w

//mongo dump/restore
mongodump --db heartbeat
//restore to mLab
mongorestore -h ds219181.mlab.com:19181 -d heroku_s3dksl6w -u heroku_s3dksl6w -p 2te74o5brtf680ccloa11ull9n ./dump/heartbeat
