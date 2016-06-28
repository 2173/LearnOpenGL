#version 330 core
//���ʵĸ���������ɫ����
struct Material
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};
uniform Material material;

//���ƹ�ǿ
struct Light
{
	vec3 position;
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};
uniform Light light;


uniform vec3 lightcolor;
uniform vec3 lightPos;
uniform vec3 viewPos;
in vec3 Normal;
in vec3 fragPos;
out vec4 color;

void main()
{
	//����һ�£��������ɫ�� ������ + ɢ��� + ����� ��������⣩
	//ɢ���;������Ӱ�����ӡ� ���յ���ɫ�����ʵ���ɫ����
	//Ӱ�����ӣ� 1.�����⣬������ͣ�����Ӱ������������ɫ�Ĺ�
	//          2.ɢ��⣬�ɹ����ڲ����ϣ������������Ĺ⣬���۲�ĽǶ��޹أ�Ӱ��������������ߺ�����㴦�ķ��ߵļнǾ�������ˣ�cos��a������
	//			 �Ƕ�Խ������ԽС�������ԽС
	//          3.����⣬Ӱ�������ɷ��������ߣ�����������������������ĽǶȾ�������ˣ�cos��a���������Ƕ�ԽС�������Խ��


	//������
	vec3 ambient = lightcolor * material.ambient * light.ambient;

	//ɢ���
	vec3 normal = normalize(Normal);
	vec3 lightDir = normalize(lightPos - fragPos);
	float diff = max(dot(normal, lightDir), 0.0f);
	vec3 diffuse = diff * lightcolor * material.diffuse * light.diffuse;

	//�����
	//material.shininess�߹�ķ���ֵ(Shininess)��һ������ķ���ֵԽ�ߣ�����������Խǿ��ɢ���Խ�٣��߹��ԽС
	vec3 viewDir = normalize(viewPos - fragPos);
	vec3 reflecDir = reflect(-lightDir, normal);
	float spec = pow(max(dot(viewDir, reflecDir),0.0f), material.shininess);
	vec3 specular = spec * lightcolor * material.specular * light.specular;
	//�����ɫ

    vec3 result = ambient + diffuse + specular;
    color = vec4(result, 1.0f);
}
