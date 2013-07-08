var sqs = require('..');

describe('a Client', function(){
	var client = null;

  beforeEach(function(){
    client = sqs(
      process.env.SQS_TEST_ACCESS_KEY_ID, 
      process.env.SQS_TEST_SECRET_ACCESS_KEY, 
      process.env.SQS_TEST_REGION
    )
  });


  it('creates a queue', function(done){
    var queue = client.createQueue('test1');
    queue.then(function(){
      expect(queue).to.exist;
      expect(queue.name).to.equal('test1');
      done();
    },
    function(e){ 
      assert.fail(e);
    }).done();
  });

  describe('with a queue named test2', function(){
    beforeEach(function(done){
      var queue = client.createQueue('test2');
      queue.then(function(){
        done();
      });
    });

    it('lists existing queues', function(done){
      client.listQueues().then(function(queues){
        expect(queues).not.to.be.empty;
        var found = false;
        queues.forEach(function(queue){
          if(queue.name == 'test2'){
            found = true;
          }
        });
        assert.ok(found, "expected a queue named test2 to exist");
        done();
      }).done();
    });

  })
});