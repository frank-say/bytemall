package com.frank.bytemall.admin.web;

import cn.binarywang.wx.miniapp.api.WxMaService;
import com.alibaba.fastjson.JSONObject;
import com.frank.bytemall.core.annotation.LoginRequire;
import com.frank.bytemall.core.constant.ErrorCodeEnum;
import com.frank.bytemall.core.exception.BizException;
import com.frank.bytemall.core.util.ResponseUtil;
import me.chanjar.weixin.common.error.WxErrorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/spu")
@Validated
public class AdminSpuController {
    private final Logger logger = LoggerFactory.getLogger(AdminSpuController.class);

    @Resource
    private WxMaService wxmaService;
    @Resource
    private RestTemplate restTemplate;

    /**
     * 查询商品
     *
     * @param productId 商品id
     * @param keyword    商品标题关键词
     * @param srouce     商品来源:1-小商店自营商品,2-带货商品
     * @param status     商品状态:5-上架,6-回收站,9-逻辑删除,11-自主下架,12-售磬下架,13-违规下架/风控系统下架
     * @param page       页数
     * @param pageSize   每页数量
     * @return
     */
    @GetMapping("/list")
    public Object list(@LoginRequire Long userId, Integer productId, String keyword,
                       @RequestParam(defaultValue = "1") Integer srouce,
                       @RequestParam(defaultValue = "5") Integer status,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer pageSize) {
        String accessToken;
        try {
            accessToken = wxmaService.getAccessToken();
        } catch (WxErrorException e) {
            logger.error("获取小程序AccessToken失败", e);
            throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "获取小程序token失败,请重试");
        }

        //根据product_id查询单个商品
        if (productId != null) {
            String url = "https://api.weixin.qq.com/product/spu/get?access_token=" + accessToken;
            JSONObject request = new JSONObject();
            request.put("product_id", productId);
            request.put("need_edit_spu", 0);
            JSONObject res = restTemplate.postForObject(url, request, JSONObject.class);
            if (res == null) {
                throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "微信接口请求失败");
            }
            Integer errcode = res.getInteger("errcode");
            if (errcode != 0) {
                String errmsg = String.format("微信接口异常,errcode:%s,errmsg:%s", errcode, res.getString("errmsg"));
                throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), errmsg);
            }
            Map<String, Object> data = new HashMap<>();
            data.put("total", 1);
            data.put("list", Collections.singletonList(res.getJSONObject("data").get("spu")));
            return ResponseUtil.ok(data);
        }

        //根据keyword模糊搜索商品
        if (!StringUtils.isEmpty(keyword)) {
            String url = "https://api.weixin.qq.com/product/spu/search?access_token=" + accessToken;
            JSONObject request = new JSONObject();
            request.put("keyword", keyword);
            request.put("srouce", srouce);
            request.put("page", page);
            request.put("page_size", pageSize);
            JSONObject res = restTemplate.postForObject(url, request, JSONObject.class);
            if (res == null) {
                throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "微信接口请求失败");
            }
            Map<String, Object> data = new HashMap<>();
            data.put("total", res.get("total_num"));
            data.put("list", res.getJSONArray("spus"));
            return ResponseUtil.ok(data);
        }

        //根据status分页查询商品列表
        String url = "https://api.weixin.qq.com/product/spu/get_list?access_token=" + accessToken;
        JSONObject request = new JSONObject();
        request.put("status", status);
        request.put("page", page);
        request.put("page_size", pageSize);
        request.put("need_edit_spu", 0);
        JSONObject res = restTemplate.postForObject(url, request, JSONObject.class);
        if (res == null) {
            throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "微信接口请求失败");
        }
        Integer errcode = res.getInteger("errcode");
        if (errcode != 0) {
            String errmsg = String.format("微信接口异常,errcode:%s,errmsg:%s", errcode, res.getString("errmsg"));
            throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), errmsg);
        }
        Map<String, Object> data = new HashMap<>();
        data.put("total", res.get("total_num"));
        data.put("list", res.getJSONArray("spus"));
        return ResponseUtil.ok(data);
    }

}
