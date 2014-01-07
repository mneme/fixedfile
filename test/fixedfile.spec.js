var 
	FixedFile = require('../lib/fixedfile'),
	expect = require('chai').expect,
	fs = require('fs'),
	path = require('path');


var template = path.join('./test/spec'),
		output = path.join('test/output');


function loadFile(){
	return fs.readFileSync('output', {encoding:"utf8"});
}

function newFile(){
	var ff = new FixedFile();
	ff
		.loadConfig(template)
		.setWriteStream(output);
	return ff;
}

function outputFile(){
	return fs.readFileSync(output, {encoding:'utf8'});
}

describe('FixedFile', function(){
	describe('Util', function(){
		it('should create a new instance without error', function(){
			var fixedfile = new FixedFile()
		})
	
		it('should load templates', function(){
			var fixedfile = new FixedFile()
			fixedfile.loadConfig(template);
			expect(fixedfile.templates).to.exist;
			expect(fixedfile.templates.name).to.exist;
		})
	
		it('should throw error when trying to use wrong template', function(){
			var ff = newFile();
			function run(){
				ff.write({}, 'doesNotExist')
			}

			expect(run).to.throw(Error);
		});
	
	});

	describe('file', function(){
		var ff;
		beforeEach(function(){
			ff = newFile();
		});
		
		it('should be created', function(){
			ff.write({name:"test"}, 'name');
			ff.done();
			expect(fs.statSync(output)).to.not.throw;
		});

		it('should have the right length', function(done){
			var ff = newFile();
			ff.write({name:"test"}, 'name');

			ff.once('end',function(){
				var data = outputFile();
				expect(data.length).to.equal(11);
				done();
			});
			ff.done();
		});
		
		it('should write all objects as lines', function(done){
			for (var i = 0; i < 1000; i++) {
				ff.write({name: 'name'}, 'name');
			}
			ff.done();

			ff.on('end',function(){
				var data = outputFile();
				expect(data.split('\n').length).to.equal(1001);
				done();
			});
		});

		it('should use property', function(done){
			var ff = newFile();
			
			ff.write({name:"test"}, 'name');

			ff.once('end',function(){
				var data = outputFile();
				expect(data).to.equal('test      \n');
				done();
			});
			ff.done();
		});

		
		it('should use value', function(done){
			ff.write({}, 'value');
			ff.once('end', function(){
				var data = outputFile();
				expect(data).to.equal('value     \n');
				done();
			});

			ff.done();
		});

		it('should adjust left', function(done){
			ff.write({}, 'left');
			ff.once('end', function(){
				var data = outputFile();
				expect(data).to.equal('value     \n');
				done();
			});

			ff.done();
		});

		it('should adjust right', function(done){
			ff.write({}, 'right');
			ff.once('end', function(){
				var data = outputFile();
				expect(data).to.equal('     value\n');
				done();
			});

			ff.done();
		});

		it('should fill with correct character', function(done){
			ff.write({}, 'zerofill');
			ff.once('end', function(){
				var data = outputFile();
				expect(data).to.equal('value00000\n');
				done();
			});

			ff.done();
		});

		it('should use formatting function', function(done){
			ff.write({value:"value"}, 'format');
			ff.once('end', function(){
				var data = outputFile();
				expect(data).to.equal('value1    \n');
				done();
			});

			ff.done();
		})
	})

	after(function(){
		try{
			fs.unlinkSync(output);
		}
		catch(e){}
	});
});