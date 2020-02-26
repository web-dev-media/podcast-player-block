const glob = require("glob");

const config = () => {
    const tmpFolder = '/tmp/'+ this.themeName;
    const moduleFiles = glob.sync('./' + this.moduleBase + '/**/*.php');

    let moduleFilesToCopy = [
        { source: './assets/dist/'+ this.version + '/', destination: './'+ this.packageBase + tmpFolder + '/assets/dist/' + this.version },
    ];

    if(moduleFiles.length > 0){
        moduleFiles.map((file, index) => {
            moduleFilesToCopy.push( {
                source: file,
                destination: './'+ this.packageBase + tmpFolder + '/' + file.replace('./','')
            });
        });
    }

	return {
		production : {
			onEnd  : {
				copy  : moduleFilesToCopy,
				mkdir  : [
					'./'+ this.packageBase + '/packages'
				],
				archive: [
					{
						source     : './'+ this.packageBase + '/tmp/',
						destination: './'+ this.packageBase + '/packages/build-' + this.version + '.tar.gz',
						format     : 'tar',
						options    : {
							gzip       : true,
							gzipOptions: {
								level: 1
							},
							globOptions: {
								nomount: true
							}
						}
					}
				],
				delete : [
					//'./'+ this.packageBase + '/tmp',
					'./assets/dist/' + this.version
				]
			}
		},
		development: {
			onStart: {
				delete: [ './assets/dist/' ]
			}
		}} ///
};

module.exports = ( mode, packageName, packageBase, moduleBase, version ) => {
	this.mode = mode || null;
	this.packageName = packageName || null;
	this.packageBase = packageBase || null;
	this.moduleBase = moduleBase || null;
	this.version = version || null;

	return config()[ mode ];
};
