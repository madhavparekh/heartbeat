URL for 'Time-series: Daily data' - https://waterdata.usgs.gov/nwis/dv?cb_00060=on&format=rdb&site_no=08251500&referred_module=sw&period=&begin_date=1899-07-01&end_date=2018-06-19

//mLab
mongodb://heroku_s3dksl6w:2te74o5brtf680ccloa11ull9n@ds219181.mlab.com:19181/heroku_s3dksl6w

//mongo dump/restore
mongodump --db heartbeat
//restore to mLab
mongorestore -h ds219181.mlab.com:19181 -d heroku_s3dksl6w -u heroku_s3dksl6w -p 2te74o5brtf680ccloa11ull9n ./dump/heartbeat

//local
mongorestore -d heartbeat ./dump/heartbeat

36°57'9" N 110°4'21" W

To parse your input use the following.

function ParseDMS(input) {
var parts = input.split(/[^\d\w]+/);
var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
}
The following will convert your DMS to DD

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
var dd = degrees + minutes/60 + seconds/(60\*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;

}
