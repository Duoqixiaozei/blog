（function（）{
  function WobbleWindow（object，params）{
    var canvas，
      CTX;
    var mousePos = {
      x：0，
      y：0
    };
    var isResizing = false;
    var delayId = 0;
    var canvasContent = {};
    var points = {};

    var settings = {};
    settings.name ='wobblew'; //名称
    settings.position ='relative'; //相对或绝对
    settings.depth = -1; // zIndex的深度
    settings.overflowX ='visible';
    settings.overflowY ='可见';
    settings.offsetX = 0; // +或 - 重写div的大小
    settings.offsetY = 0; // +或 - 重写div的大小
    settings.moveTypeIn ='move'; //方法点跟随鼠标
    settings.moveTypeOut ='wobble'; //方法点返回初始位置
    settings.wobbleFactor = 0.95; //控制摆动效果
    settings.wobbleSpeed = 0.1; //控制摆动效果
    settings.moveSpeed = 6; //控制移动速度
    settings.lineWidth = 1; //行宽

    settings.transplantLineColor = false; // true使用Object border-color
    settings.lineColor =''; //没有值=没有线。使用hex / rgba值
    settings.transplantBodyColor = true; // true使用对象背景颜色
    settings.bodyColor =''; //没有值=没有体色。使用hex / rgba值
    settings.radius = 50; //
    settings.pointCountX = 7; //水平点数量。必须是一个奇怪的int
    settings.pointCountY = 5; //垂直点的数量。必须是一个奇怪的int
    settings.movementLeft = true; //启用/禁用移动方向
    settings.movementRight = true; //启用/禁用移动方向
    settings.movementTop = true; //启用/禁用移动方向
    settings.movementBottom = true; //启用/禁用移动方向
    settings.autoResize = true; //如果真实尺寸将自动调整
    settings.debug = false; //启用/禁用调试模式

    // ---
    if（params！== undefined）{
      for（var prop in params）{
        if（params.hasOwnProperty（prop）&& settings.hasOwnProperty（prop））{
          设置[prop] = params [prop];
        }
      }
    }

    // ---
    if（！object）{
      抛出错误（'\ n'+'找不到div元素'）;
    }
    if（（settings.pointCountX％2）=== 0）{
      throw Error（'\ n'+'Param pointCountX必须是奇数'）;
    }
    if（（settings.pointCountY％2）=== 0）{
      throw Error（'\ n'+'Param pointCountY必须是奇数'）;
    }

    // ---
    HTMLElement.prototype .__ defineGetter __（“currentStyle”，function（）{
      return this.ownerDocument.defaultView.getComputedStyle（this，null）;
    }）;
    // ---
    function init（）{
      canvas = document.createElement（'canvas'）;
      canvas.id = settings.name;
      canvas.style.position ='绝对';
      canvas.style.zIndex = settings.depth.toString（）;
      canvas.addEventListener（'mousemove'，mouseMoveHandler）;
      canvas.addEventListener（'mouseleave'，mouseLeaveHandler）;
      ctx = canvas.getContext（'2d'）;

      // element.insertBefore（canvas，element.firstChild）;
      object.appendChild（帆布）;
      object.style.position = settings.position;
      object.style.zIndex =（settings.depth + 1）.toString（）;
      if（settings.overflowX.length> 0）{
        object.parentElement.style.overflowX = settings.overflowX;
      };
      if（settings.overflowY.length> 0）{
        object.parentElement.style.overflowY = settings.overflowY;
      };
      if（settings.transplantBodyColor）{
        if（object.currentStyle.backgroundColor.length> 0）{
          settings.bodyColor = object.currentStyle.backgroundColor;
        }
      };
      if（settings.transplantLineColor）{
        if（object.currentStyle.borderColor.length> 0）{
          settings.lineColor = object.currentStyle.borderColor;
        }
      };
      canvasContent.elementWidth = object.offsetWidth;
      canvasContent.elementHeight = object.offsetHeight;
      // ---
      resizeCanvas（）;
      addWindow（）;
      animloop（）;
      // -----------
      if（settings.transplantBodyColor）{
        if（object.currentStyle.backgroundColor.length> 0）{
          if（object.className.length> 0）{
            object.className + ='wobbleTransparentBK';
          } else {
            object.className ='wobbleTransparentBK';
          };
        }
      };
      if（settings.transplantLineColor）{
        if（object.currentStyle.borderColor.length> 0）{
          if（object.className.length> 0）{
            object.className + ='wobbleTransparentLine';
          } else {
            object.className ='wobbleTransparentLine';
          };
        }
      };
    };

    // ---
    function resizeCanvas（）{
      canvasContent.width = canvasContent.elementWidth + settings.offsetX * 2;
      canvasContent.height = canvasContent.elementHeight + settings.offsetY * 2;

      if（settings.radius> 0）{// round，ceil
        settings.pointCountX = Math.round（canvasContent.width / settings.radius）;
        settings.pointCountY = Math.round（canvasContent.height / settings.radius）;
      };
      if（settings.pointCountX％2 == 0）{
        settings.pointCountX = settings.pointCountX + 1;
      };
      if（settings.pointCountY％2 == 0）{
        settings.pointCountY = settings.pointCountY + 1;
      };

      points.spaceX = Math.min（canvasContent.elementWidth，canvasContent.width /（settings.pointCountX  -  1））;
      points.spaceY = Math.min（canvasContent.elementHeight，canvasContent.height /（settings.pointCountY + 1））;
      points.radius = Math.ceil（Math.max（points.spaceX，points.spaceY））;

      /// --------------名new1 ------------------
      canvasContent.left = 0;
      canvasContent.top = 0;
      settings.canvasWidth = canvasContent.elementWidth;
      if（settings.movementLeft）{
        canvas.style.left = -points.radius +'px';
        settings.canvasWidth + = points.radius;
        canvasContent.left = points.radius  -  settings.offsetX;
      } else {
        canvas.style.left = -settings.offsetX +'px';
      };
      if（settings.movementRight）
        settings.canvasWidth + = points.radius;

      settings.canvasHeight = canvasContent.elementHeight;
      if（settings.movementTop）{
        canvas.style.top = -points.radius +'px';
        settings.canvasHeight + = points.radius;
        canvasContent.top = points.radius  -  settings.offsetY;
      } else {
        canvas.style.top = -settings.offsetY +'px';
      };
      if（settings.movementBottom）
        settings.canvasHeight + = points.radius;

      canvas.width = settings.canvasWidth;
      canvas.height = settings.canvasHeight;
    };

    // ---
    function addWindow（）{
      points.pointHolder = [];
      // ---
      变点;
      var flag;
      var i，
        升;
      // ---
      //最佳
      flag = true;
      for（i = 0，l = settings.pointCountX; i <l; i ++）{
        if（settings.movementTop）{
          if（flag）{
            point = addPoint（canvasContent.left + i * points.spaceX，canvasContent.top，0,0,0，true，points.spaceX，'P'，settings.debug）;
            flag = false;
          } else {
            point = addPoint（canvasContent.left + i * points.spaceX，canvasContent.top，0,0,0，true，points.spaceX，'C'，settings.debug）;
            flag = true;
          }
          if（i === 0 || i === l  -  1）{
            point.color ='＃00FF00';
            point.movement = false;
          }
          points.pointHolder.push（点）;
        } else {
          if（i === 0 || i === l  -  1）{
            point = addPoint（canvasContent.left + i * points.spaceX，canvasContent.top，0,0,0，false，0，'P'，settings.debug）;
          }
          points.pointHolder.push（点）;
        }
      }

      // ---
      //对
      flag = false;
      for（i = 1，l = settings.pointCountY + 1; i <l; i ++）{
        if（settings.movementRight）{
          if（flag）{
            point = addPoint（canvasContent.left + canvasContent.width，canvasContent.top + i * points.spaceY，0,0,0，true，points.spaceY，'P'，settings.debug）;
            flag = false;
          } else {
            point = addPoint（canvasContent.left + canvasContent.width，canvasContent.top + i * points.spaceY，0,0,0，true，points.spaceY，'C'，settings.debug）;
            flag = true;
          }
          points.pointHolder.push（点）;
        } else {
          if（i === 1）{
            point = addPoint（canvasContent.left + canvasContent.width，canvasContent.top +（i  -  1）* points.spaceY，0,0,0，false，0，'P'，settings.debug）;
          } else if（i === settings.pointCountY）{
            point = addPoint（canvasContent.left + canvasContent.width，canvasContent.top +（i + 1）* points.spaceY，0,0,0，false，0，'P'，settings.debug）;
          }
          points.pointHolder.push（点）;
        }
      }

      // ---
      //底部
      flag = true;
      for（i = settings.pointCountX  -  1，l = -1; i> l; i--）{
        if（settings.movementBottom）{
          if（flag）{
            point = addPoint（canvasContent.left + i * points.spaceX，canvasContent.top + canvasContent.height，0,0,0，true，points.spaceX，'P'，settings.debug）;
            flag = false;
          } else {
            point = addPoint（canvasContent.left + i * points.spaceX，canvasContent.top + canvasContent.height，0,0,0，true，points.spaceX，'C'，settings.debug）;
            flag = true;
          }
          if（i === 0 || i === settings.pointCountX  -  1）{
            point.color ='＃00FF00';
            point.movement = false;
          }
          points.pointHolder.push（点）;
        } else {
          if（i === 0 || i === settings.pointCountX  -  1）{
            point = addPoint（canvasContent.left + i * points.spaceX，canvasContent.top + canvasContent.height，0,0,0，false，0，'P'，settings.debug）;
          }
          points.pointHolder.push（点）;
        }
      }

      // ---
      //剩下
      flag = false;
      for（i = settings.pointCountY，l = -1; i> l; i--）{
        if（settings.movementLeft）{
          if（flag）{
            point = addPoint（canvasContent.left，canvasContent.top + i * points.spaceY，0,0,0，true，points.spaceY，'P'，settings.debug）;
            flag = false;
          } else {
            point = addPoint（canvasContent.left，canvasContent.top + i * points.spaceY，0,0,0，true，points.spaceY，'C'，settings.debug）;
            flag = true;
          }
          points.pointHolder.push（点）;
        } else {
          if（i === 0）{
            point = addPoint（canvasContent.left，canvasContent.top + i * points.spaceY，0,0,0，false，0，'P'，settings.debug）;
          } else if（i === settings.pointCountY）{
            point = addPoint（canvasContent.left，canvasContent.top +（i + 1）* points.spaceY，0,0,0，false，0，'P'，settings.debug）;
          }
          points.pointHolder.push（点）;
        }
      }
    }

    // ---
    function addPoint（x，y，xp，yp，distance，movement，radius，type，visible）{
      var point = {};
      point.x = x;
      point.y = y;
      point.xp = x;
      point.yp = y;
      point.sx = 0;
      point.sy = 0;
      point.distance = distance;
      point.movement =运动;
      point.radius = radius;
      point.type = type;
      point.visible = visible;
      回归点;
    };

    // ---
    window.requestAnimFrame =（function（）{
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function（callback）{
        window.setTimeout（callback，1000/60）;
      };
    }）（）;

    function animloop（）{
      requestAnimFrame（animloop）;
      渲染（）;
      if（settings.autoResize）{
        调整大小（）;
      }
    };

    // ---
    function render（）{
      ctx.clearRect（0,0，settings.canvasWidth，settings.canvasHeight）;

      // ---
      var windowPoints = points.pointHolder;
      var i，
        升;

      // ---
      ctx.beginPath（）;
      ctx.moveTo（windowPoints [0] .x，windowPoints [0] .y）;
      for（i = 1，l = windowPoints.length; i <l; i + = 2）{
        var point = windowPoints [i];

        // ---
        var dx = mousePos.x  -  point.xp;
        var dy = mousePos.y  -  point.yp;
        point.distance = Math.sqrt（dx * dx + dy * dy）;
        if（point.distance <point.radius）{
          if（settings.moveTypeIn ==='wobble'）{
            point.sx = point.sx * settings.wobbleFactor +（mousePos.x  -  point.x）* settings.wobbleSpeed;
            point.sy = point.sy * settings.wobbleFactor +（mousePos.y  -  point.y）* settings.wobbleSpeed;
            point.x = point.x + point.sx;
            point.y = point.y + point.sy;
          } else if（settings.moveTypeIn ==='move'）{
            point.x  -  =（point.x  -  mousePos.x）/ settings.moveSpeed;
            point.y  -  =（point.y  -  mousePos.y）/ settings.moveSpeed;
          }
        } else {
          if（settings.moveTypeOut ==='wobble'）{
            point.sx = point.sx * settings.wobbleFactor +（point.xp  -  point.x）* settings.wobbleSpeed;
            point.sy = point.sy * settings.wobbleFactor +（point.yp  -  point.y）* settings.wobbleSpeed;
            point.x = point.x + point.sx;
            point.y = point.y + point.sy;
          } else if（settings.moveTypeOut ==='move'）{
            point.x  -  =（point.x  -  point.xp）/ settings.moveSpeed;
            point.y  -  =（point.y  -  point.yp）/ settings.moveSpeed;
          }
        }

        // ---
        var pointBefor = windowPoints [i  -  1];
        var pointAfter = windowPoints [i + 1];
        if（i> 2 && i <windowPoints.length  -  2）{
          if（pointBefor.movement）{
            pointBefor.x =（windowPoints [i  -  2] .x + point.x）/ 2;
            pointBefor.y =（windowPoints [i  -  2] .y + point.y）/ 2;
          }
          if（pointAfter.movement）{
            pointAfter.x =（windowPoints [i + 2] .x + point.x）/ 2;
            pointAfter.y =（windowPoints [i + 2] .y + point.y）/ 2;
          }
        }
        ctx.quadraticCurveTo（point.x，point.y，pointAfter.x，pointAfter.y）;
      }

      // ---
      if（settings.lineColor.length> 0）{
        ctx.lineWidth = settings.lineWidth;
        ctx.strokeStyle = settings.lineColor;
        ctx.stroke（）;
      }
      if（settings.bodyColor.length> 0）{
        ctx.fillStyle = settings.bodyColor;
        ctx.fill（）;
      }
      // ctx.globalCompositeOperation ='source-out';
      // ctx.fillStyle =“rgba（0,0,0,1）”;
      // ctx.fill（）;

      // ---
      if（settings.debug）{
        for（i = 0，l = windowPoints.length; i <l; i ++）{
          var point = windowPoints [i];
          if（point.visible）{
            if（point.type ==='P'）{
              drawCircle（point.x，point.y，3，'＃FF0000'）;
            } else {
              drawCircle（point.x，point.y，6，'＃FF00FF'）;
            }
            if（point.color）{
              drawCircle（point.x，point.y，12，point.color）;
            }
          }
        }
        ctx.strokeStyle ='＃000000';
        ctx.strokeRect（0,0，settings.canvasWidth，settings.canvasHeight）;
      }
    };

    // ---
    function delayFlag（）{
      resizeCanvas（）;
      addWindow（）;
      isResizing = false;
    };

    function resize（）{
      if（！isResizing）{
        if（canvasContent.elementWidth！== object.offsetWidth || canvasContent.elementHeight！== object.offsetHeight）{
          // -----------
          isResizing = true;
          canvasContent.elementWidth = object.offsetWidth;
          canvasContent.elementHeight = object.offsetHeight;
          //防止闪白
          delayId = window.setTimeout（delayFlag，10）;
        }
      }
    };

    // ---
    function drawCircle（x，y，radius，color）{
      ctx.beginPath（）;
      ctx.arc（x，y，radius，0,2 * Math.PI）;
      ctx.strokeStyle = color;
      ctx.stroke（）;
    };

    // ---
    function mouseMoveHandler（event）{
      mousePos = getMousePos（canvas，event）;
    };

    function mouseLeaveHandler（event）{
      mousePos.x = -10000;
      mousePos.y = -10000;
    };

    // ---
    function getMousePos（canvas，event）{
      var rect = canvas.getBoundingClientRect（）;
      返回{
        x：event.clientX  -  rect.left，
        y：event.clientY  -  rect.top
      };
    };

    // ---
    在里面（）;
  };
  window.WobbleWindow = WobbleWindow;
}（））;
if（typeof jQuery！=='undefined'）{
  （function（$）{
    $ .fn.wobbleWindow = function（params）{
      var args = arguments;
      return this.each（function（）{
        if（！$。data（this，'plugin_WobbleWindow'））{
          $ .data（this，'plugin_WobbleWindow'，new WobbleWindow（this，params））;
        } else {
          var plugin = $ .data（this，'plugin_WobbleWindow'）;
          if（plugin [params]）{
            plugin [params] .apply（this，Array.prototype.slice.call（args，1））;
          } else {
            $ .error（'方法'+ params +'在jQuery.wobbleWindow上不存在'）;
          }
        }
      }）;
    };
  }（jQuery的））;
}