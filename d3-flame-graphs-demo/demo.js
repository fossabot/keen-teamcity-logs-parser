(function() {
  var convert, runnableVals;

  runnableVals = [];

  convert = function(rawData, valueFunc) {
	if(rawData)
	return rawData;
    var child, j, len, node, ref, subTree;
    node = {
      name: rawData.n,
      value: valueFunc(rawData),
      children: []
    };
    if (!rawData.a) {
      return node;
    }
    ref = rawData.a;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      subTree = convert(child, valueFunc);
      if (subTree) {
        node.children.push(subTree);
      }
    }
    return node;
  };

  d3.json("../data/log.json", function(err, data) {
    var allStates, flameGraph, profile, tooltip, unhide;
    allStates = function(node) {
      var j, len, ref, state, value;
      value = 0;
      ref = ['RUNNABLE', 'BLOCKED', 'TIMED_WAITING', 'WAITING'];
      for (j = 0, len = ref.length; j < len; j++) {
        state = ref[j];
        if (!isNaN(node.c[state])) {
          value += node.c[state];
        }
      }
      return value;
    };
    profile = data;//convert(data.profile, allStates);
    tooltip = function(d) {
      return d.name + " <br /><br /> " + d.value + " seconds<br /> " + (((d.value / profile.value) * 100).toFixed(2)) + "% of total";
    };
    flameGraph = d3.flameGraph('#d3-flame-graph', data, true).size([1200, 600]).cellHeight(20).zoomEnabled(true).zoomAction(function(node, event) {
      return console.log(node, event);
    }).tooltip(tooltip).render();
    d3.select('#highlight').on('click', function() {
      var nodes;
      nodes = flameGraph.select(function(d) {
        return /java\.util.*/.test(d.name);
      });
      return nodes.classed("highlight", function(d, i) {
        return !d3.select(this).classed("highlight");
      });
    });
    d3.select('#zoom').on('click', function() {
      var node;
      node = flameGraph.select((function(d) {
        return /CountDownLatch\.await$/.test(d.name);
      }), false)[0];
      return flameGraph.zoom(node);
    });
    unhide = false;
    d3.select('#hide').on('click', function() {
      flameGraph.hide((function(d) {
        return /Unsafe\.park$/.test(d.name) || /Object\.wait$/.test(d.name);
      }), unhide);
      return unhide = !unhide;
    });
    d3.select('#runnable').on('click', function() {
      profile = convert(data.profile, (function(node) {
        if (node.c['RUNNABLE']) {
          return node.c['RUNNABLE'];
        } else {
          return 0;
        }
      }));
      return flameGraph = d3.flameGraph('#d3-flame-graph', profile).size([1200, 600]).cellHeight(20).zoomEnabled(true).zoomAction(function(node, event) {
        return console.log(node, event);
      }).tooltip(tooltip).render();
    });
    return d3.select('#rasta').on('click', function() {
      var rastaMode;
      rastaMode = function(d) {
        var cells, ref, ref1, ref2;
        cells = 600 / 20;
        if ((0 <= (ref = d.depth) && ref < cells / 3)) {
          return '#1E9600';
        }
        if ((cells / 3 <= (ref1 = d.depth) && ref1 < cells * 2 / 3)) {
          return '#FFF200';
        }
        if ((cells * 2 / 3 <= (ref2 = d.depth) && ref2 < cells)) {
          return '#FF0000';
        }
      };
      return flameGraph.color(rastaMode).render();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,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U0FBQTtBQUNYLFVBQUE7TUFBQSxTQUFBLEdBQVksU0FBQyxDQUFEO0FBQ1YsWUFBQTtRQUFBLEtBQUEsR0FBUSxHQUFBLEdBQU07UUFDZCxJQUFvQixDQUFBLENBQUEsV0FBaUIsQ0FBQyxDQUFDLE1BQW5CLE9BQUEsR0FBMkIsS0FBQSxHQUFRLENBQW5DLENBQXBCO0FBQUEsaUJBQU8sVUFBUDs7UUFDQSxJQUFvQixDQUFBLEtBQUEsR0FBUSxDQUFSLFlBQWlCLENBQUMsQ0FBQyxNQUFuQixRQUFBLEdBQTJCLEtBQUEsR0FBUSxDQUFSLEdBQVksQ0FBdkMsQ0FBcEI7QUFBQSxpQkFBTyxVQUFQOztRQUNBLElBQW9CLENBQUEsS0FBQSxHQUFRLENBQVIsR0FBWSxDQUFaLFlBQWlCLENBQUMsQ0FBQyxNQUFuQixRQUFBLEdBQTJCLEtBQTNCLENBQXBCO0FBQUEsaUJBQU8sVUFBUDs7TUFKVTthQUtaLFVBQVUsQ0FBQyxLQUFYLENBQWlCLFNBQWpCLENBQTJCLENBQUMsTUFBNUIsQ0FBQTtJQU5XLENBRGY7RUFoRDJCLENBQTdCO0FBaEJBIiwiZmlsZSI6ImRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJydW5uYWJsZVZhbHMgPSBbXVxuY29udmVydCA9IChyYXdEYXRhLCB2YWx1ZUZ1bmMpIC0+XG5cbiAgbm9kZSA9XG4gICAgbmFtZTogcmF3RGF0YS5uLFxuICAgIHZhbHVlOiB2YWx1ZUZ1bmMocmF3RGF0YSksXG4gICAgY2hpbGRyZW46IFtdXG5cbiAgIyB0aGUgYSBmaWVsZCBpcyB0aGUgbGlzdCBvZiBjaGlsZHJlblxuICByZXR1cm4gbm9kZSBpZiBub3QgcmF3RGF0YS5hXG4gIGZvciBjaGlsZCBpbiByYXdEYXRhLmFcbiAgICBzdWJUcmVlID0gY29udmVydChjaGlsZCwgdmFsdWVGdW5jKVxuICAgIGlmIHN1YlRyZWVcbiAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChzdWJUcmVlKVxuICBub2RlXG5cbmQzLmpzb24gXCJkYXRhL3Byb2ZpbGUuanNvblwiLCAoZXJyLCBkYXRhKSAtPlxuICBhbGxTdGF0ZXMgPSAobm9kZSkgLT5cbiAgICB2YWx1ZSA9IDBcbiAgICBmb3Igc3RhdGUgaW4gWydSVU5OQUJMRScsICdCTE9DS0VEJywgJ1RJTUVEX1dBSVRJTkcnLCAnV0FJVElORyddXG4gICAgICB2YWx1ZSArPSBub2RlLmNbc3RhdGVdIGlmIG5vdCBpc05hTihub2RlLmNbc3RhdGVdKVxuICAgIHZhbHVlXG5cblxuICBwcm9maWxlID0gY29udmVydChkYXRhLnByb2ZpbGUsIGFsbFN0YXRlcylcbiAgdG9vbHRpcCA9IChkKSAtPiBcIiN7ZC5uYW1lfSA8YnIgLz48YnIgLz5cbiAgICAje2QudmFsdWV9IHNhbXBsZXM8YnIgLz5cbiAgICAjeygoZC52YWx1ZSAvIHByb2ZpbGUudmFsdWUpICogMTAwKS50b0ZpeGVkKDIpfSUgb2YgdG90YWxcIlxuICBmbGFtZUdyYXBoID0gZDMuZmxhbWVHcmFwaCgnI2QzLWZsYW1lLWdyYXBoJywgcHJvZmlsZSwgdHJ1ZSlcbiAgICAuc2l6ZShbMTIwMCwgNjAwXSlcbiAgICAuY2VsbEhlaWdodCgyMClcbiAgICAuem9vbUVuYWJsZWQodHJ1ZSlcbiAgICAuem9vbUFjdGlvbigobm9kZSwgZXZlbnQpIC0+IGNvbnNvbGUubG9nKG5vZGUsIGV2ZW50KSlcbiAgICAudG9vbHRpcCh0b29sdGlwKVxuICAgIC5yZW5kZXIoKVxuXG4gIGQzLnNlbGVjdCgnI2hpZ2hsaWdodCcpXG4gICAgLm9uICdjbGljaycsICgpIC0+XG4gICAgICBub2RlcyA9IGZsYW1lR3JhcGguc2VsZWN0KChkKSAtPiAvamF2YVxcLnV0aWwuKi8udGVzdChkLm5hbWUpKVxuICAgICAgbm9kZXMuY2xhc3NlZChcImhpZ2hsaWdodFwiLCAoZCwgaSkgLT4gbm90IGQzLnNlbGVjdChAKS5jbGFzc2VkKFwiaGlnaGxpZ2h0XCIpKVxuXG4gIGQzLnNlbGVjdCgnI3pvb20nKVxuICAgIC5vbiAnY2xpY2snLCAoKSAtPlxuICAgICAgIyBqdW1wIHRvIHRoZSBmaXJzdCBqYXZhLnV0aWwuY29uY3VycmVudCBtZXRob2Qgd2UgY2FuIGZpbmRcbiAgICAgIG5vZGUgPSBmbGFtZUdyYXBoLnNlbGVjdCgoKGQpIC0+IC9Db3VudERvd25MYXRjaFxcLmF3YWl0JC8udGVzdChkLm5hbWUpKSwgZmFsc2UpWzBdXG4gICAgICBmbGFtZUdyYXBoLnpvb20obm9kZSlcblxuICB1bmhpZGUgPSBmYWxzZVxuICBkMy5zZWxlY3QoJyNoaWRlJylcbiAgICAub24gJ2NsaWNrJywgKCkgLT5cbiAgICAgIGZsYW1lR3JhcGguaGlkZSAoKGQpIC0+IC9VbnNhZmVcXC5wYXJrJC8udGVzdChkLm5hbWUpIG9yIC9PYmplY3RcXC53YWl0JC8udGVzdChkLm5hbWUpKSwgdW5oaWRlXG4gICAgICB1bmhpZGUgPSAhdW5oaWRlXG5cbiAgZDMuc2VsZWN0KCcjcnVubmFibGUnKVxuICAgIC5vbiAnY2xpY2snLCAoKSAtPlxuICAgICAgcHJvZmlsZSA9IGNvbnZlcnQoZGF0YS5wcm9maWxlLCAoKG5vZGUpIC0+IGlmIG5vZGUuY1snUlVOTkFCTEUnXSB0aGVuIG5vZGUuY1snUlVOTkFCTEUnXSBlbHNlIDApKVxuICAgICAgZmxhbWVHcmFwaCA9IGQzLmZsYW1lR3JhcGgoJyNkMy1mbGFtZS1ncmFwaCcsIHByb2ZpbGUpXG4gICAgICAgIC5zaXplKFsxMjAwLCA2MDBdKVxuICAgICAgICAuY2VsbEhlaWdodCgyMClcbiAgICAgICAgLnpvb21FbmFibGVkKHRydWUpXG4gICAgICAgIC56b29tQWN0aW9uKChub2RlLCBldmVudCkgLT4gY29uc29sZS5sb2cobm9kZSwgZXZlbnQpKVxuICAgICAgICAudG9vbHRpcCh0b29sdGlwKVxuICAgICAgICAucmVuZGVyKClcblxuICBkMy5zZWxlY3QoJyNyYXN0YScpXG4gICAgLm9uICdjbGljaycsICgpIC0+XG4gICAgICByYXN0YU1vZGUgPSAoZCkgLT5cbiAgICAgICAgY2VsbHMgPSA2MDAgLyAyMFxuICAgICAgICByZXR1cm4gJyMxRTk2MDAnIGlmIDAgICAgICAgICAgICAgPD0gZC5kZXB0aCA8IGNlbGxzIC8gM1xuICAgICAgICByZXR1cm4gJyNGRkYyMDAnIGlmIGNlbGxzIC8gMyAgICAgPD0gZC5kZXB0aCA8IGNlbGxzICogMiAvIDNcbiAgICAgICAgcmV0dXJuICcjRkYwMDAwJyBpZiBjZWxscyAqIDIgLyAzIDw9IGQuZGVwdGggPCBjZWxsc1xuICAgICAgZmxhbWVHcmFwaC5jb2xvcihyYXN0YU1vZGUpLnJlbmRlcigpIl19